using Microsoft.EntityFrameworkCore;

namespace JustDo.Models
{
    public class JustDoContext: DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Task> Tasks { get; set; }

        public JustDoContext(DbContextOptions options) : base(options)
        {
        }
    }
}
