using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OperaWeb.Server.DataClasses.Migrations
{
    /// <inheritdoc />
    public partial class Editcategories : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CategoriaId",
                table: "SubCategorie",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_SubCategorie_CategoriaId",
                table: "SubCategorie",
                column: "CategoriaId");

            migrationBuilder.AddForeignKey(
                name: "FK_SubCategorie_Categorie_CategoriaId",
                table: "SubCategorie",
                column: "CategoriaId",
                principalTable: "Categorie",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubCategorie_Categorie_CategoriaId",
                table: "SubCategorie");

            migrationBuilder.DropIndex(
                name: "IX_SubCategorie_CategoriaId",
                table: "SubCategorie");

            migrationBuilder.DropColumn(
                name: "CategoriaId",
                table: "SubCategorie");
        }
    }
}
