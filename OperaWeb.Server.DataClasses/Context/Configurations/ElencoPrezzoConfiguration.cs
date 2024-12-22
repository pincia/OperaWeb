using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OperaWeb.Server.DataClasses.Models;

public class ElencoPrezzoConfiguration : IEntityTypeConfiguration<ElencoPrezzo>
{
  public void Configure(EntityTypeBuilder<ElencoPrezzo> builder)
  {
    builder.HasKey(ep => ep.ID);

    builder.HasOne(ep => ep.Project)
           .WithMany(p => p.ElencoPrezzi)
           .HasForeignKey(ep => ep.ProjectID)
           .OnDelete(DeleteBehavior.Cascade);
  }
}
