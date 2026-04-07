using System.Collections.Generic;
using LegalConnectAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace LegalConnectAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Lawyer> Lawyers { get; set; }
    }
}