using Microsoft.EntityFrameworkCore;
using BluDiet.API.Models;

namespace BluDiet.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    // Tablas base
    public DbSet<Patient> Patients => Set<Patient>();
    public DbSet<Measurement> Measurements => Set<Measurement>();
    public DbSet<MedicalHistory> MedicalHistories => Set<MedicalHistory>();
    public DbSet<Food> Foods => Set<Food>();
    public DbSet<Diet> Diets => Set<Diet>();
    public DbSet<DietDay> DietDays => Set<DietDay>();
    public DbSet<DietMeal> DietMeals => Set<DietMeal>();
    public DbSet<DietSlot> DietSlots => Set<DietSlot>();
    public DbSet<DietSlotItem> DietSlotItems => Set<DietSlotItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<MedicalHistory>().ToTable("medical_history");

        modelBuilder.Entity<DietDay>()
        .HasOne(d => d.Diet)
        .WithMany(p => p.Days)
        .HasForeignKey(d => d.DietId);

        modelBuilder.Entity<DietMeal>()
            .HasOne(m => m.Diet)
            .WithMany(d => d.Meals)
            .HasForeignKey(m => m.DietId);

        modelBuilder.Entity<DietSlot>()
            .HasOne(s => s.Meal)
            .WithMany(m => m.Slots)
            .HasForeignKey(s => s.MealId);

        modelBuilder.Entity<DietSlotItem>()
            .HasOne(i => i.Slot)
            .WithMany(s => s.Items)
            .HasForeignKey(i => i.SlotId);

        // 1. Relación 1:1 estricta (Es mejor dejarla aquí para asegurar que el ID sea único)
        modelBuilder.Entity<MedicalHistory>()
            .HasOne(mh => mh.Patient)
            .WithOne(p => p.MedicalHistory)
            .HasForeignKey<MedicalHistory>(mh => mh.PatientId);

        // 2. Configuración explícita de JSONB (Aunque ya lo pusiste en el modelo, dejarlo aquí no molesta)
        modelBuilder.Entity<Food>()
            .Property(f => f.FullNutrients)
            .HasColumnType("jsonb");

        // 3. Índices útiles para rendimiento
        modelBuilder.Entity<Food>()
            .HasIndex(f => f.ExternalId)
            .IsUnique()
            .HasFilter("\"external_id\" IS NOT NULL");
    }
}