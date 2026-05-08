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
    
    // Nueva tabla de biblioteca de alimentos
    public DbSet<Food> Foods => Set<Food>();

    // Tablas de estructura de Dieta
    public DbSet<Diet> Diets => Set<Diet>();
    public DbSet<DietDay> DietDays => Set<DietDay>(); // <--- NUEVA
    public DbSet<DietMeal> DietMeals => Set<DietMeal>();
    public DbSet<DietSlot> DietSlots => Set<DietSlot>();
    public DbSet<DietSlotItem> DietSlotItems => Set<DietSlotItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configuración de Tablas (Naming Convention Snake Case)
        modelBuilder.Entity<Patient>().ToTable("patients");
        modelBuilder.Entity<Measurement>().ToTable("measurements");
        modelBuilder.Entity<MedicalHistory>().ToTable("medical_history");
        modelBuilder.Entity<Food>().ToTable("foods");
        modelBuilder.Entity<Diet>().ToTable("diets");
        modelBuilder.Entity<DietDay>().ToTable("diet_days");
        modelBuilder.Entity<DietMeal>().ToTable("diet_meals");
        modelBuilder.Entity<DietSlot>().ToTable("diet_slots");
        modelBuilder.Entity<DietSlotItem>().ToTable("diet_slot_items");

        // Relaciones Mediciones e Historia
        modelBuilder.Entity<Measurement>(e => {
            e.HasOne(p => p.Patient).WithMany(p => p.Measurements).HasForeignKey(p => p.PatientId);
        });

        modelBuilder.Entity<MedicalHistory>(e => {
            e.HasOne(p => p.Patient).WithOne(p => p.MedicalHistory).HasForeignKey<MedicalHistory>(p => p.PatientId);
        });

        // Configuración para el Seeder de Alimentos (JSONB)
        modelBuilder.Entity<Food>(e => {
            e.Property(f => f.FullNutrients).HasColumnType("jsonb");
        });

        // Relaciones de la estructura de Dieta
        modelBuilder.Entity<DietDay>(e => {
            e.HasOne<Diet>().WithMany().HasForeignKey(d => d.DietId);
        });

        modelBuilder.Entity<DietSlotItem>(e => {
            // Relación con el Alimento (food_id)
            e.HasOne<Food>().WithMany().HasForeignKey(i => i.FoodId);
            // Relación con el Día (day_id)
            e.HasOne<DietDay>().WithMany().HasForeignKey(i => i.DayId);
        });
    }
}