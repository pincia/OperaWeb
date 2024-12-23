using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OperaWeb.Server.DataClasses.Migrations
{
    /// <inheritdoc />
    public partial class ediutNliai : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Analisi_ProjectID",
                table: "Analisi");

            migrationBuilder.AlterColumn<decimal>(
                name: "ConfQuantita",
                table: "Analisi",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_Analisi_ProjectID",
                table: "Analisi",
                column: "ProjectID",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Analisi_ProjectID",
                table: "Analisi");

            migrationBuilder.AlterColumn<string>(
                name: "ConfQuantita",
                table: "Analisi",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.CreateIndex(
                name: "IX_Analisi_ProjectID",
                table: "Analisi",
                column: "ProjectID");
        }
    }
}
