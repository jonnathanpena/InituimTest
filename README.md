# InituimTest
> Prueba de admisión para Initium Software, con .Net Core y Angular/Redux

### Macro Estructura

    .
    ├── ...
    ├── ClientApp          # Aplicación en Angular/Redux
    └── ...


### Tecnologías aplicadas
Se aplicarón las siguientes tecnologías

> **General**: [.Net Core], [Angular], [Redux], [EntityFramework], [EntityFrameworkSqlServer], [Linq], [Crypto-JS], [Microsoft.AspNetCore.Mvc], [Microsoft.EntityFrameworkCore.Tools], [Material.Angular], [@angular/flex-layout], [typescript]

### ClientApp Micro Estructura
Los archivos básicamente se componen de la siguiente manera

    .
    ├── ...
    ├── src/app            # Directorio principal del client, donde se codificó
    │   ├── redux          # Todos los archivos que componen a Redux (states, actions, reducers)
    │   ├── providers      # Proveedores o servicios de consumo api
    │   └── models         # Interfaces o modelos de la aplicación
    │   └── components     # Componentes externos, como por ejemplo: BottomSheet
    │   └── ...            # Demás componentes del client 
    └── ...

### .Net Core Micro Estructura
Los archivos básicamente se componen de la siguiente manera

    .
    ├── ...
    ├── InitiumTest        # Directorio principal
    │   ├── Controllers    # Controladores del Backend
    │   ├── Functions      # Funciones de las entidades (colas y clientes)
    │   └── Migrations     # Migración generada por EntityFramework
    │   └── Models         # Clases modelos de la aplicación (Client, QueueCat, Queue)
    │   └── Utils          # Utilidades que se comparten/utilizan en muchas clases de la aplicación (LOGS)
    │   └── ...            # Demás archivos propios del sistema
    └── ...

### Configuración e Instalación
Para el Cliente: Buscar en la carpeta [src/providers/url.provider.ts] y cambiar la dirección al dominio que se desee apuntar
Para el Backend: Ir al archivo [appsettings.json] y cambiar la configuración para la conexión a SQL Server
> **Migrate**: [Update-Database]