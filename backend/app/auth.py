from pyramid.httpexceptions import HTTPUnauthorized

def auth_middleware(handler, registry):
    def middleware(request):
        # Bypass login route supaya bisa akses tanpa token
        if request.matched_route and request.matched_route.name == 'login':
            return handler(request)

        # Cek header Authorization
        auth_header = request.headers.get('Authorization')
        if auth_header == 'Bearer dummy-token-admin':
            return handler(request)

        # Kalau tidak ada token yang valid, tolak akses
        raise HTTPUnauthorized("Unauthorized: Token invalid atau tidak ada")
    return middleware
