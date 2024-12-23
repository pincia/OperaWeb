using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OperaWeb.Server.DataClasses.Migrations
{
    /// <inheritdoc />
    public partial class ediutconfignumeri2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ConfigNumeri_ProjectID",
                table: "ConfigNumeri");

            migrationBuilder.CreateIndex(
                name: "IX_ConfigNumeri_ProjectID",
                table: "ConfigNumeri",
                column: "ProjectID",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ConfigNumeri_ProjectID",
                table: "ConfigNumeri");

            migrationBuilder.CreateIndex(
                name: "IX_ConfigNumeri_ProjectID",
                table: "ConfigNumeri",
                column: "ProjectID");
        }
    }
}
