# init_db.py
from app.models import Base  # Import deklarasi Base dari models
from sqlalchemy import engine_from_config
from pyramid.paster import get_appsettings

def main():
    # Baca konfigurasi dari file development.ini
    settings = get_appsettings('development.ini')

    # Buat engine SQLAlchemy berdasarkan konfigurasi
    engine = engine_from_config(settings, 'sqlalchemy.')

    # Buat semua tabel di database sesuai model yang sudah didefinisikan di Base
    Base.metadata.create_all(engine)

    print("✅ Tabel berhasil dibuat.")

if __name__ == "__main__":
    main()
