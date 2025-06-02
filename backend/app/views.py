from pyramid.view import view_config
from pyramid.response import Response
from sqlalchemy.exc import DBAPIError
from .models import Player
import json

@view_config(route_name='get_players', renderer='json', request_method='GET')
def get_players(request):
    print("get_players dipanggil")
    players = request.dbsession.query(Player).all()
    return [p.to_dict() for p in players]


@view_config(route_name='add_player', renderer='json', request_method='POST')
def add_player(request):
    try:
        data = request.json_body
        new_player = Player(name=data['name'], goals=data['goals'], assists=data['assists'])
        request.dbsession.add(new_player)
        return {'message': 'Player added'}
    except Exception as e:
        return Response(json.dumps({'error': str(e)}), content_type='application/json; charset=UTF-8', status=500)

@view_config(route_name='delete_player', renderer='json', request_method='DELETE')
def delete_player(request):
    player_id = request.matchdict.get('id')
    player = request.dbsession.query(Player).get(player_id)
    if not player:
        return Response(json.dumps({'error': 'Not found'}), content_type='application/json; charset=UTF-8', status=404)
    request.dbsession.delete(player)
    return {'message': 'Player deleted'}

@view_config(route_name='login', request_method='POST', renderer='json')
def login_view(request):
    ADMIN_USERNAME = "admin"
    ADMIN_PASSWORD = "admin123"

    try:
        data = request.json_body
        username = data.get('username')
        password = data.get('password')

        if username == ADMIN_USERNAME and password == ADMIN_PASSWORD:
            return {
                'status': 'success',
                'message': 'Login berhasil',
                'token': 'dummy-token-admin'  # Token dummy
            }
        else:
            return Response(
                json.dumps({'status': 'error', 'message': 'Username atau password salah'}),
                content_type='application/json',
                status=401
            )
    except Exception as e:
        return Response(
            json.dumps({'status': 'error', 'message': str(e)}),
            content_type='application/json',
            status=500
        )

# Fungsi untuk menangani route home '/'
@view_config(route_name='home', renderer='json')
def home_view(request):
    return {'message': 'API backend aktif'}
