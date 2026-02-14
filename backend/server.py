from fastapi import FastAPI, APIRouter, HTTPException, Depends, status, UploadFile, File, Form
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
from passlib.context import CryptContext
from jose import JWTError, jwt
import base64

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Security
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()
SECRET_KEY = os.environ.get('SECRET_KEY', 'your-secret-key-change-in-production')
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 24 hours

app = FastAPI()
api_router = APIRouter(prefix="/api")

# Models
class User(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    password_hash: str
    role: str = "admin"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class Appointment(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: Optional[EmailStr] = None
    service: str
    date: str
    time: str
    message: Optional[str] = None
    status: str = "pending"  # pending, confirmed, completed, cancelled
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class AppointmentCreate(BaseModel):
    name: str
    phone: str
    email: Optional[EmailStr] = None
    service: str
    date: str
    time: str
    message: Optional[str] = None

class AppointmentUpdate(BaseModel):
    status: Optional[str] = None

class Contact(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    message: str

class GalleryImage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    category: str  # salon_interior, service_work, students, certificates
    image_url: str
    title: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class GalleryImageCreate(BaseModel):
    category: str
    image_url: str
    title: Optional[str] = None

class Service(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    category: str  # hair, grooming, bridal, academy
    description: Optional[str] = None
    price: Optional[float] = None
    duration: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ServiceCreate(BaseModel):
    name: str
    category: str
    description: Optional[str] = None
    price: Optional[float] = None
    duration: Optional[str] = None

class ServiceUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    duration: Optional[str] = None

# Auth functions
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = await db.users.find_one({"email": email}, {"_id": 0})
    if user is None:
        raise credentials_exception
    return User(**user)

# Initialize admin user
async def init_admin():
    admin_email = "manansingh800@gmail.com"
    existing_admin = await db.users.find_one({"email": admin_email}, {"_id": 0})
    if not existing_admin:
        admin_user = User(
            email=admin_email,
            password_hash=get_password_hash("Admin@1234"),
            role="admin"
        )
        doc = admin_user.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        await db.users.insert_one(doc)
        logger.info(f"Admin user created: {admin_email}")

# Public Routes
@api_router.post("/auth/login", response_model=Token)
async def login(user_login: UserLogin):
    user = await db.users.find_one({"email": user_login.email}, {"_id": 0})
    if not user or not verify_password(user_login.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    access_token = create_access_token(data={"sub": user["email"]})
    return {"access_token": access_token, "token_type": "bearer"}

@api_router.get("/auth/me", response_model=User)
async def get_me(current_user: User = Depends(get_current_user)):
    return current_user

# Public Appointment Routes
@api_router.post("/appointments", response_model=Appointment)
async def create_appointment(appointment: AppointmentCreate):
    appointment_obj = Appointment(**appointment.model_dump())
    doc = appointment_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.appointments.insert_one(doc)
    return appointment_obj

# Public Contact Routes
@api_router.post("/contacts", response_model=Contact)
async def create_contact(contact: ContactCreate):
    contact_obj = Contact(**contact.model_dump())
    doc = contact_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contacts.insert_one(doc)
    return contact_obj

# Public Gallery Routes
@api_router.get("/gallery", response_model=List[GalleryImage])
async def get_gallery(category: Optional[str] = None):
    query = {"category": category} if category else {}
    images = await db.gallery.find(query, {"_id": 0}).to_list(1000)
    for img in images:
        if isinstance(img.get('created_at'), str):
            img['created_at'] = datetime.fromisoformat(img['created_at'])
    return images

# Public Services Routes
@api_router.get("/services", response_model=List[Service])
async def get_services(category: Optional[str] = None):
    query = {"category": category} if category else {}
    services = await db.services.find(query, {"_id": 0}).to_list(1000)
    for service in services:
        if isinstance(service.get('created_at'), str):
            service['created_at'] = datetime.fromisoformat(service['created_at'])
    return services

# Admin Appointment Routes
@api_router.get("/admin/appointments", response_model=List[Appointment])
async def get_all_appointments(current_user: User = Depends(get_current_user)):
    appointments = await db.appointments.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    for appt in appointments:
        if isinstance(appt.get('created_at'), str):
            appt['created_at'] = datetime.fromisoformat(appt['created_at'])
    return appointments

@api_router.get("/admin/appointments/today", response_model=List[Appointment])
async def get_today_appointments(current_user: User = Depends(get_current_user)):
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    appointments = await db.appointments.find({"date": today}, {"_id": 0}).to_list(1000)
    for appt in appointments:
        if isinstance(appt.get('created_at'), str):
            appt['created_at'] = datetime.fromisoformat(appt['created_at'])
    return appointments

@api_router.patch("/admin/appointments/{appointment_id}", response_model=Appointment)
async def update_appointment(appointment_id: str, update: AppointmentUpdate, current_user: User = Depends(get_current_user)):
    update_data = {k: v for k, v in update.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No update data provided")
    
    result = await db.appointments.update_one({"id": appointment_id}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Appointment not found")
    
    appointment = await db.appointments.find_one({"id": appointment_id}, {"_id": 0})
    if isinstance(appointment.get('created_at'), str):
        appointment['created_at'] = datetime.fromisoformat(appointment['created_at'])
    return Appointment(**appointment)

@api_router.delete("/admin/appointments/{appointment_id}")
async def delete_appointment(appointment_id: str, current_user: User = Depends(get_current_user)):
    result = await db.appointments.delete_one({"id": appointment_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return {"message": "Appointment deleted successfully"}

# Admin Contact Routes
@api_router.get("/admin/contacts", response_model=List[Contact])
async def get_all_contacts(current_user: User = Depends(get_current_user)):
    contacts = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    for contact in contacts:
        if isinstance(contact.get('created_at'), str):
            contact['created_at'] = datetime.fromisoformat(contact['created_at'])
    return contacts

@api_router.delete("/admin/contacts/{contact_id}")
async def delete_contact(contact_id: str, current_user: User = Depends(get_current_user)):
    result = await db.contacts.delete_one({"id": contact_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Contact not found")
    return {"message": "Contact deleted successfully"}

# Admin Gallery Routes
@api_router.post("/admin/gallery", response_model=GalleryImage)
async def create_gallery_image(image: GalleryImageCreate, current_user: User = Depends(get_current_user)):
    image_obj = GalleryImage(**image.model_dump())
    doc = image_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.gallery.insert_one(doc)
    return image_obj

@api_router.delete("/admin/gallery/{image_id}")
async def delete_gallery_image(image_id: str, current_user: User = Depends(get_current_user)):
    result = await db.gallery.delete_one({"id": image_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Image not found")
    return {"message": "Image deleted successfully"}

# Admin Services Routes
@api_router.post("/admin/services", response_model=Service)
async def create_service(service: ServiceCreate, current_user: User = Depends(get_current_user)):
    service_obj = Service(**service.model_dump())
    doc = service_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.services.insert_one(doc)
    return service_obj

@api_router.patch("/admin/services/{service_id}", response_model=Service)
async def update_service(service_id: str, update: ServiceUpdate, current_user: User = Depends(get_current_user)):
    update_data = {k: v for k, v in update.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No update data provided")
    
    result = await db.services.update_one({"id": service_id}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Service not found")
    
    service = await db.services.find_one({"id": service_id}, {"_id": 0})
    if isinstance(service.get('created_at'), str):
        service['created_at'] = datetime.fromisoformat(service['created_at'])
    return Service(**service)

@api_router.delete("/admin/services/{service_id}")
async def delete_service(service_id: str, current_user: User = Depends(get_current_user)):
    result = await db.services.delete_one({"id": service_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Service not found")
    return {"message": "Service deleted successfully"}

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    await init_admin()
    logger.info("Application started")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()