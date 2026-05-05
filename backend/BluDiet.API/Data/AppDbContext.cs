using Microsoft.EntityFrameworkCore;
using BluDiet.API.Models;

namespace BluDiet.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Patient> Patients => Set<Patient>();
    public DbSet<Measurement> Measurements => Set<Measurement>();
    public DbSet<MedicalHistory> MedicalHistories => Set<MedicalHistory>();
    public DbSet<Diet> Diets => Set<Diet>();
    public DbSet<DietMeal> DietMeals => Set<DietMeal>();
    public DbSet<DietSlot> DietSlots => Set<DietSlot>();
    public DbSet<DietSlotItem> DietSlotItems => Set<DietSlotItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Patient>(e =>
        {
            e.ToTable("patients");
        });

        modelBuilder.Entity<Measurement>(e =>
        {
            e.ToTable("measurements");
            e.HasOne(p => p.Patient)
                .WithMany(p => p.Measurements)
                .HasForeignKey(p => p.PatientId);
        });

        modelBuilder.Entity<MedicalHistory>(e =>
        {
            e.ToTable("medical_history");
            e.HasOne(p => p.Patient)
                .WithOne(p => p.MedicalHistory)
                .HasForeignKey<MedicalHistory>(p => p.PatientId);
        });

        modelBuilder.Entity<Diet>(e =>
        {
            e.ToTable("diets");
        });

        modelBuilder.Entity<DietMeal>(e =>
        {
            e.ToTable("diet_meals");
        });

        modelBuilder.Entity<DietSlot>(e =>
        {
            e.ToTable("diet_slots");
        });

        modelBuilder.Entity<DietSlotItem>(e =>
        {
            e.ToTable("diet_slot_items");
        });
    }
}