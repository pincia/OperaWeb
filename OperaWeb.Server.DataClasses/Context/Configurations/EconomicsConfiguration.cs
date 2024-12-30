using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using OperaWeb.Server.DataClasses.Models;

namespace OperaWeb.Server.DataClasses.Context.Configurations
{
  public class EconomicsConfiguration : IEntityTypeConfiguration<Economics>
  {
    public void Configure(EntityTypeBuilder<Economics> builder)
    {
      // Mappa la tabella Economics
      builder.ToTable("Economics");

      // Imposta la chiave primaria
      builder.HasKey(e => e.Id);

      // Proprietà per MeasuredWorks
      builder.Property(e => e.MeasuredWorks)
          .HasColumnType("decimal(18,2)")
          .IsRequired()
          .HasComment("Importo dei lavori a misura");

      // Proprietà per LumpSumWorks
      builder.Property(e => e.LumpSumWorks)
          .HasColumnType("decimal(18,2)")
          .IsRequired()
          .HasComment("Importo dei lavori a corpo");

      // Proprietà per SafetyCosts
      builder.Property(e => e.SafetyCosts)
          .HasColumnType("decimal(18,2)")
          .IsRequired()
          .HasComment("Costi della sicurezza");

      // Proprietà per LaborCosts
      builder.Property(e => e.LaborCosts)
          .HasColumnType("decimal(18,2)")
          .IsRequired()
          .HasComment("Costi della manodopera");

      // Proprietà per AuctionVariationPercentage
      builder.Property(e => e.AuctionVariationPercentage)
          .HasColumnType("decimal(18,2)")
          .IsRequired()
          .HasComment("Percentuale variazione d'asta");

      // Proprietà per AvailableSums
      builder.Property(e => e.AvailableSums)
          .HasColumnType("decimal(18,2)")
          .IsRequired()
          .HasComment("Somme a disposizione");

      // Proprietà per TotalProjectCalculationType
      builder.Property(e => e.TotalProjectCalculationType)
          .HasConversion<string>() // Converte l'enum in stringa per il database
          .IsRequired()
          .HasComment("Tipo di calcolo del totale progetto");

    }
  }
}
