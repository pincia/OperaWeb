using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OperaWeb.Server.DataClasses.Migrations
{
    /// <inheritdoc />
    public partial class editProjectMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_SoaClassifications_SoaClassificationId",
                table: "Projects");

            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Soa_SoaCategoryId",
                table: "Projects");

            migrationBuilder.AlterColumn<int>(
                name: "SoaClassificationId",
                table: "Projects",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "SoaCategoryId",
                table: "Projects",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_SoaClassifications_SoaClassificationId",
                table: "Projects",
                column: "SoaClassificationId",
                principalTable: "SoaClassifications",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Soa_SoaCategoryId",
                table: "Projects",
                column: "SoaCategoryId",
                principalTable: "Soa",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_SoaClassifications_SoaClassificationId",
                table: "Projects");

            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Soa_SoaCategoryId",
                table: "Projects");

            migrationBuilder.AlterColumn<int>(
                name: "SoaClassificationId",
                table: "Projects",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "SoaCategoryId",
                table: "Projects",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_SoaClassifications_SoaClassificationId",
                table: "Projects",
                column: "SoaClassificationId",
                principalTable: "SoaClassifications",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Soa_SoaCategoryId",
                table: "Projects",
                column: "SoaCategoryId",
                principalTable: "Soa",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
