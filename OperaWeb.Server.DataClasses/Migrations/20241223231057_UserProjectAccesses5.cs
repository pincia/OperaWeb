using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OperaWeb.Server.DataClasses.Migrations
{
    /// <inheritdoc />
    public partial class UserProjectAccesses5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Analisi_Projects_ProjectID",
                table: "Analisi");

            migrationBuilder.DropForeignKey(
                name: "FK_Categorie_Projects_ProjectID",
                table: "Categorie");

            migrationBuilder.DropForeignKey(
                name: "FK_ConfigNumeri_Projects_ProjectID",
                table: "ConfigNumeri");

            migrationBuilder.DropForeignKey(
                name: "FK_DatiGenerali_Projects_ProjectID",
                table: "DatiGenerali");

            migrationBuilder.DropForeignKey(
                name: "FK_ElencoPrezzi_Projects_ProjectID",
                table: "ElencoPrezzi");

            migrationBuilder.DropForeignKey(
                name: "FK_SubCategorie_Projects_ProjectID",
                table: "SubCategorie");

            migrationBuilder.DropForeignKey(
                name: "FK_SuperCategorie_Projects_ProjectID",
                table: "SuperCategorie");

            migrationBuilder.AddForeignKey(
                name: "FK_Analisi_Projects_ProjectID",
                table: "Analisi",
                column: "ProjectID",
                principalTable: "Projects",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Categorie_Projects_ProjectID",
                table: "Categorie",
                column: "ProjectID",
                principalTable: "Projects",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ConfigNumeri_Projects_ProjectID",
                table: "ConfigNumeri",
                column: "ProjectID",
                principalTable: "Projects",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DatiGenerali_Projects_ProjectID",
                table: "DatiGenerali",
                column: "ProjectID",
                principalTable: "Projects",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ElencoPrezzi_Projects_ProjectID",
                table: "ElencoPrezzi",
                column: "ProjectID",
                principalTable: "Projects",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_SubCategorie_Projects_ProjectID",
                table: "SubCategorie",
                column: "ProjectID",
                principalTable: "Projects",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_SuperCategorie_Projects_ProjectID",
                table: "SuperCategorie",
                column: "ProjectID",
                principalTable: "Projects",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Analisi_Projects_ProjectID",
                table: "Analisi");

            migrationBuilder.DropForeignKey(
                name: "FK_Categorie_Projects_ProjectID",
                table: "Categorie");

            migrationBuilder.DropForeignKey(
                name: "FK_ConfigNumeri_Projects_ProjectID",
                table: "ConfigNumeri");

            migrationBuilder.DropForeignKey(
                name: "FK_DatiGenerali_Projects_ProjectID",
                table: "DatiGenerali");

            migrationBuilder.DropForeignKey(
                name: "FK_ElencoPrezzi_Projects_ProjectID",
                table: "ElencoPrezzi");

            migrationBuilder.DropForeignKey(
                name: "FK_SubCategorie_Projects_ProjectID",
                table: "SubCategorie");

            migrationBuilder.DropForeignKey(
                name: "FK_SuperCategorie_Projects_ProjectID",
                table: "SuperCategorie");

            migrationBuilder.AddForeignKey(
                name: "FK_Analisi_Projects_ProjectID",
                table: "Analisi",
                column: "ProjectID",
                principalTable: "Projects",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Categorie_Projects_ProjectID",
                table: "Categorie",
                column: "ProjectID",
                principalTable: "Projects",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ConfigNumeri_Projects_ProjectID",
                table: "ConfigNumeri",
                column: "ProjectID",
                principalTable: "Projects",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DatiGenerali_Projects_ProjectID",
                table: "DatiGenerali",
                column: "ProjectID",
                principalTable: "Projects",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ElencoPrezzi_Projects_ProjectID",
                table: "ElencoPrezzi",
                column: "ProjectID",
                principalTable: "Projects",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SubCategorie_Projects_ProjectID",
                table: "SubCategorie",
                column: "ProjectID",
                principalTable: "Projects",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SuperCategorie_Projects_ProjectID",
                table: "SuperCategorie",
                column: "ProjectID",
                principalTable: "Projects",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
