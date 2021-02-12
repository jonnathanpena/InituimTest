using Microsoft.EntityFrameworkCore;

namespace InitiumTest.Models
{
    /*
        Clase ApplicationDbContext
        Contiene la context(conexión) con la base de datos de la aplicación
    */
    public class ApplicationDbContext : DbContext
    {
        /*
            Constructor
            A través de la inyección de dependencias en el constructor configuramos las opciones de la conexión
        */
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        // Relacionamos el modelo con la tabla de la base de datos y configuramos
        public DbSet<Client> Client { get; set; }
        // Relacionamos el modelo con la tabla de la base de datos y configuramos
        public DbSet<QueueCat> QueueCat { get; set; }
        // Relacionamos el modelo con la tabla de la base de datos y configuramos
        public DbSet<Queue> Queue { get; set; }

    }
}
