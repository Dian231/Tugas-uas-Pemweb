from pyramid.config import Configurator
from pyramid.events import NewRequest
from sqlalchemy import engine_from_config
from .models import (
    DBSession,
    Base,
)

# ✅ Fungsi untuk menambahkan header CORS ke semua respons
def add_cors_headers_response_callback(event):
    def cors_headers(request, response):
        response.headers.update({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        })
    event.request.add_response_callback(cors_headers)

# ✅ Fungsi utama yang dijalankan oleh Pyramid saat server start
def main(global_config, **settings):
    # Setup koneksi database
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    Base.metadata.bind = engine

    # Konfigurasi Pyramid
    config = Configurator(settings=settings)

    # Aktifkan CORS di semua request
    config.add_subscriber(add_cors_headers_response_callback, NewRequest)

    # Setup database request property
    config.include('pyramid_tm')
    config.include('pyramid_retry')

    # Tambahkan rute API
    config.add_route('home', '/')
    config.add_route('get_players', '/api/players')
    config.add_route('add_player', '/api/players')
    config.add_route('delete_player', '/api/players/{id}')
    config.add_route('login', '/api/login')

    # Scan semua view yang menggunakan @view_config
    config.scan()

    # Kembalikan WSGI app
    return config.make_wsgi_app()
