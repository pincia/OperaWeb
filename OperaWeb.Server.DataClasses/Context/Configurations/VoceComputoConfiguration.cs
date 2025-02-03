using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OperaWeb.Server.DataClasses.Models;

public class VoceComputoConfiguration : IEntityTypeConfiguration<VoceComputo>
{
  public void Configure(EntityTypeBuilder<VoceComputo> builder)
  {
    builder.HasKey(vc => vc.ID);

    // Configurazione delle relazioni
    builder.HasOne(vc => vc.SuperCategoria)
           .WithMany()
           .HasForeignKey(vc => vc.SuperCategoriaID)
           .OnDelete(DeleteBehavior.NoAction);

    builder.HasOne(vc => vc.Categoria)
           .WithMany()
           .HasForeignKey(vc => vc.CategoriaID)
           .OnDelete(DeleteBehavior.NoAction);

    builder.HasOne(vc => vc.SubCategoria)
           .WithMany()
           .HasForeignKey(vc => vc.SubCategoriaID)
           .OnDelete(DeleteBehavior.NoAction);

    builder.HasOne(vc => vc.Project)
           .WithMany(p => p.VociComputo)
           .HasForeignKey(vc => vc.ProjectID)
           .OnDelete(DeleteBehavior.Restrict);

    // Configurazione dei tipi di colonna per il tipo 'decimal'
    builder.Property(vc => vc.Prezzo)
           .HasColumnType("decimal(18, 2)");

    builder.Property(vc => vc.Quantita)
           .HasColumnType("decimal(18, 2)");
  }
}
