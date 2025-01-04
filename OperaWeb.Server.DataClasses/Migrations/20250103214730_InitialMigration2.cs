using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OperaWeb.Server.DataClasses.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrganizationMembers_Companies_CompanyId1",
                table: "OrganizationMembers");

            migrationBuilder.DropIndex(
                name: "IX_OrganizationMembers_CompanyId1",
                table: "OrganizationMembers");

            migrationBuilder.DropColumn(
                name: "CompanyId1",
                table: "OrganizationMembers");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CompanyId1",
                table: "OrganizationMembers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationMembers_CompanyId1",
                table: "OrganizationMembers",
                column: "CompanyId1");

            migrationBuilder.AddForeignKey(
                name: "FK_OrganizationMembers_Companies_CompanyId1",
                table: "OrganizationMembers",
                column: "CompanyId1",
                principalTable: "Companies",
                principalColumn: "Id");
        }
    }
}
