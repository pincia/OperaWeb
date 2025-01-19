using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OperaWeb.Server.DataClasses.Migrations
{
    /// <inheritdoc />
    public partial class Editcategories2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SuperCategoriaId",
                table: "Categorie",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Categorie_SuperCategoriaId",
                table: "Categorie",
                column: "SuperCategoriaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Categorie_SuperCategorie_SuperCategoriaId",
                table: "Categorie",
                column: "SuperCategoriaId",
                principalTable: "SuperCategorie",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Categorie_SuperCategorie_SuperCategoriaId",
                table: "Categorie");

            migrationBuilder.DropIndex(
                name: "IX_Categorie_SuperCategoriaId",
                table: "Categorie");

            migrationBuilder.DropColumn(
                name: "SuperCategoriaId",
                table: "Categorie");
        }
    }
}
