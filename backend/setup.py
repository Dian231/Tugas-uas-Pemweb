from setuptools import setup

requires = [
    "pyramid",
    "sqlalchemy",
    "pyramid_jwt",
    "pyramid_chameleon",
]

setup(
    name="backend",
    install_requires=requires,
    entry_points={
        "paste.app_factory": [
            "main = app.__init__:main",
        ],
    },
)
