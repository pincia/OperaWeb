using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OperaWeb.Server.DataClasses.Migrations
{
    /// <inheritdoc />
    public partial class Editcategories3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Categorie_SuperCategorie_SuperCategoriaId",
                table: "Categorie");

            migrationBuilder.DropForeignKey(
                name: "FK_SubCategorie_Categorie_CategoriaId",
                table: "SubCategorie");

            migrationBuilder.AlterColumn<int>(
                name: "CategoriaId",
                table: "SubCategorie",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "SuperCategoriaId",
                table: "Categorie",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Categorie_SuperCategorie_SuperCategoriaId",
                table: "Categorie",
                column: "SuperCategoriaId",
                principalTable: "SuperCategorie",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_SubCategorie_Categorie_CategoriaId",
                table: "SubCategorie",
                column: "CategoriaId",
                principalTable: "Categorie",
                principalColumn: "ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Categorie_SuperCategorie_SuperCategoriaId",
                table: "Categorie");

            migrationBuilder.DropForeignKey(
                name: "FK_SubCategorie_Categorie_CategoriaId",
                table: "SubCategorie");

            migrationBuilder.AlterColumn<int>(
                name: "CategoriaId",
                table: "SubCategorie",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "SuperCategoriaId",
                table: "Categorie",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Categorie_SuperCategorie_SuperCategoriaId",
                table: "Categorie",
                column: "SuperCategoriaId",
                principalTable: "SuperCategorie",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SubCategorie_Categorie_CategoriaId",
                table: "SubCategorie",
                column: "CategoriaId",
                principalTable: "Categorie",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
