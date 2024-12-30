using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OperaWeb.Server.DataClasses.Migrations
{
    /// <inheritdoc />
    public partial class AddEconomicsToProject2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Economics_Projects_ProjectId",
                table: "Economics");

            migrationBuilder.DropColumn(
                name: "CMO",
                table: "Economics");

            migrationBuilder.DropColumn(
                name: "CSI",
                table: "Economics");

            migrationBuilder.DropColumn(
                name: "LCP",
                table: "Economics");

            migrationBuilder.DropColumn(
                name: "LMS",
                table: "Economics");

            migrationBuilder.DropColumn(
                name: "SAD",
                table: "Economics");

            migrationBuilder.DropColumn(
                name: "TTP",
                table: "Economics");

            migrationBuilder.DropColumn(
                name: "VBA",
                table: "Economics");

            migrationBuilder.AddColumn<decimal>(
                name: "AuctionVariationPercentage",
                table: "Economics",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m,
                comment: "Percentuale variazione d'asta");

            migrationBuilder.AddColumn<decimal>(
                name: "AvailableSums",
                table: "Economics",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m,
                comment: "Somme a disposizione");

            migrationBuilder.AddColumn<decimal>(
                name: "LaborCosts",
                table: "Economics",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m,
                comment: "Costi della manodopera");

            migrationBuilder.AddColumn<decimal>(
                name: "LumpSumWorks",
                table: "Economics",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m,
                comment: "Importo dei lavori a corpo");

            migrationBuilder.AddColumn<decimal>(
                name: "MeasuredWorks",
                table: "Economics",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m,
                comment: "Importo dei lavori a misura");

            migrationBuilder.AddColumn<decimal>(
                name: "SafetyCosts",
                table: "Economics",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m,
                comment: "Costi della sicurezza");

            migrationBuilder.AddColumn<string>(
                name: "TotalProjectCalculationType",
                table: "Economics",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                comment: "Tipo di calcolo del totale progetto");

            migrationBuilder.AddForeignKey(
                name: "FK_Economics_Projects_ProjectId",
                table: "Economics",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Economics_Projects_ProjectId",
                table: "Economics");

            migrationBuilder.DropColumn(
                name: "AuctionVariationPercentage",
                table: "Economics");

            migrationBuilder.DropColumn(
                name: "AvailableSums",
                table: "Economics");

            migrationBuilder.DropColumn(
                name: "LaborCosts",
                table: "Economics");

            migrationBuilder.DropColumn(
                name: "LumpSumWorks",
                table: "Economics");

            migrationBuilder.DropColumn(
                name: "MeasuredWorks",
                table: "Economics");

            migrationBuilder.DropColumn(
                name: "SafetyCosts",
                table: "Economics");

            migrationBuilder.DropColumn(
                name: "TotalProjectCalculationType",
                table: "Economics");

            migrationBuilder.AddColumn<decimal>(
                name: "CMO",
                table: "Economics",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "CSI",
                table: "Economics",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "LCP",
                table: "Economics",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "LMS",
                table: "Economics",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "SAD",
                table: "Economics",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "TTP",
                table: "Economics",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "VBA",
                table: "Economics",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddForeignKey(
                name: "FK_Economics_Projects_ProjectId",
                table: "Economics",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
