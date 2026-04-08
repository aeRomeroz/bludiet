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
            e.Property(p => p.Id).HasColumnName("id");
            e.Property(p => p.FirstName).HasColumnName("first_name");
            e.Property(p => p.LastName).HasColumnName("last_name");
            e.Property(p => p.BirthDate).HasColumnName("birth_date");
            e.Property(p => p.Gender).HasColumnName("gender");
            e.Property(p => p.Occupation).HasColumnName("occupation");
            e.Property(p => p.ConsultationReason).HasColumnName("consultation_reason");
            e.Property(p => p.Status).HasColumnName("status");
            e.Property(p => p.AvatarUrl).HasColumnName("avatar_url");
            e.Property(p => p.CreatedAt).HasColumnName("created_at");
        });

        modelBuilder.Entity<Measurement>(e =>
        {
            e.ToTable("measurements");
            e.Property(p => p.Id).HasColumnName("id");
            e.Property(p => p.PatientId).HasColumnName("patient_id");
            e.Property(p => p.Date).HasColumnName("date");
            e.Property(p => p.Weight).HasColumnName("weight");
            e.Property(p => p.Height).HasColumnName("height");
            e.Property(p => p.IsInitial).HasColumnName("is_initial");
            e.HasOne(p => p.Patient)
                .WithMany(p => p.Measurements)
                .HasForeignKey(p => p.PatientId);
        });

        modelBuilder.Entity<MedicalHistory>(e =>
        {
            e.ToTable("medical_history");
            e.Property(p => p.Id).HasColumnName("id");
            e.Property(p => p.PatientId).HasColumnName("patient_id");
            e.Property(p => p.ChronicDiseasesHasCondition).HasColumnName("chronic_diseases_has_condition");
            e.Property(p => p.ChronicDiseasesObservation).HasColumnName("chronic_diseases_observation");
            e.Property(p => p.PreviousSurgeriesHasCondition).HasColumnName("previous_surgeries_has_condition");
            e.Property(p => p.PreviousSurgeriesObservation).HasColumnName("previous_surgeries_observation");
            e.Property(p => p.AllergiesHasCondition).HasColumnName("allergies_has_condition");
            e.Property(p => p.AllergiesObservation).HasColumnName("allergies_observation");
            e.Property(p => p.MedicationsHasCondition).HasColumnName("medications_has_condition");
            e.Property(p => p.MedicationsObservation).HasColumnName("medications_observation");
            e.Property(p => p.SmokesHasCondition).HasColumnName("smokes_has_condition");
            e.Property(p => p.SmokesObservation).HasColumnName("smokes_observation");
            e.Property(p => p.DrinksAlcoholHasCondition).HasColumnName("drinks_alcohol_has_condition");
            e.Property(p => p.DrinksAlcoholObservation).HasColumnName("drinks_alcohol_observation");
            e.HasOne(p => p.Patient)
                .WithOne(p => p.MedicalHistory)
                .HasForeignKey<MedicalHistory>(p => p.PatientId);
        });

        modelBuilder.Entity<Diet>(e =>
        {
            e.ToTable("diets");
            e.Property(p => p.Id).HasColumnName("id");
            e.Property(p => p.PatientId).HasColumnName("patient_id");
            e.Property(p => p.DurationDays).HasColumnName("duration_days");
            e.Property(p => p.TargetKcalPerDay).HasColumnName("target_kcal_per_day");
            e.Property(p => p.TargetProtein).HasColumnName("target_protein");
            e.Property(p => p.TargetFats).HasColumnName("target_fats");
            e.Property(p => p.TargetCarbs).HasColumnName("target_carbs");
            e.Property(p => p.StartDate).HasColumnName("start_date");
            e.Property(p => p.CreatedAt).HasColumnName("created_at");
        });

        modelBuilder.Entity<DietMeal>(e =>
        {
            e.ToTable("diet_meals");
            e.Property(p => p.Id).HasColumnName("id");
            e.Property(p => p.DietId).HasColumnName("diet_id");
            e.Property(p => p.OrderIndex).HasColumnName("order_index");
        });

        modelBuilder.Entity<DietSlot>(e =>
        {
            e.ToTable("diet_slots");
            e.Property(p => p.Id).HasColumnName("id");
            e.Property(p => p.MealId).HasColumnName("meal_id");
            e.Property(p => p.SlotIndex).HasColumnName("slot_index");
        });

        modelBuilder.Entity<DietSlotItem>(e =>
        {
            e.ToTable("diet_slot_items");
            e.Property(p => p.Id).HasColumnName("id");
            e.Property(p => p.SlotId).HasColumnName("slot_id");
            e.Property(p => p.DayIndex).HasColumnName("day_index");
            e.Property(p => p.FoodName).HasColumnName("food_name");
            e.Property(p => p.ExternalFoodId).HasColumnName("external_food_id");
            e.Property(p => p.FoodId).HasColumnName("food_id");
        });
    }
}