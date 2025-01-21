using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OperaWeb.Server.DataClasses.Migrations
{
    /// <inheritdoc />
    public partial class EditProject3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ResourceTeamTypes_Projects_ProjectId",
                table: "ResourceTeamTypes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ResourceTeamTypes",
                table: "ResourceTeamTypes");

            migrationBuilder.RenameTable(
                name: "ResourceTeamTypes",
                newName: "ProjectResourceTeamType");

            migrationBuilder.RenameIndex(
                name: "IX_ResourceTeamTypes_ProjectId",
                table: "ProjectResourceTeamType",
                newName: "IX_ProjectResourceTeamType_ProjectId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProjectResourceTeamType",
                table: "ProjectResourceTeamType",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectResourceTeamType_Projects_ProjectId",
                table: "ProjectResourceTeamType",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectResourceTeamType_Projects_ProjectId",
                table: "ProjectResourceTeamType");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProjectResourceTeamType",
                table: "ProjectResourceTeamType");

            migrationBuilder.RenameTable(
                name: "ProjectResourceTeamType",
                newName: "ResourceTeamTypes");

            migrationBuilder.RenameIndex(
                name: "IX_ProjectResourceTeamType_ProjectId",
                table: "ResourceTeamTypes",
                newName: "IX_ResourceTeamTypes_ProjectId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ResourceTeamTypes",
                table: "ResourceTeamTypes",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ResourceTeamTypes_Projects_ProjectId",
                table: "ResourceTeamTypes",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
