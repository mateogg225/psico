"""
FastAPI Backend para Psico Isla.

Entry point de la aplicación.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings

# Crear instancia de FastAPI
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.VERSION,
    description="Backend gamificado para aprender psicología estilo Duolingo"
)

# Configurar CORS para permitir peticiones desde el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, especificar dominios exactos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """Endpoint de prueba para verificar que el servidor está activo."""
    return {
        "message": "🎮 Bienvenido a Psico Isla API",
        "version": settings.VERSION,
        "status": "active"
    }


@app.get("/health")
async def health_check():
    """Health check para monitoreo."""
    return {"status": "healthy"}


# Nota: Los routers de API se importarán aquí cuando estén creados
# from app.api.v1 import auth, users, courses
# app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
# app.include_router(users.router, prefix="/api/v1/users", tags=["users"])
# app.include_router(courses.router, prefix="/api/v1/courses", tags=["courses"])
