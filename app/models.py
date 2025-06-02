from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy import create_engine

DBSession = scoped_session(sessionmaker())
Base = declarative_base()

class Player(Base):
    __tablename__ = 'players'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    goals = Column(Integer)
    assists = Column(Integer)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'goals': self.goals,
            'assists': self.assists
        }

# Tambahkan class Admin ini di bawah
class Admin(Base):
    __tablename__ = 'admins'
    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True, nullable=False)
    password = Column(String(100), nullable=False)  # Untuk sekarang simpan plain text dulu

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
        }
