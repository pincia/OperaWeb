using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OperaWeb.Server.DataClasses.Migrations
{
    /// <inheritdoc />
    public partial class ProjectRole2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoleProjectRoles_ProjectRole_ProjectRoleId",
                table: "RoleProjectRoles");

            migrationBuilder.DropTable(
                name: "ProjectRole");

            migrationBuilder.RenameColumn(
                name: "ProjectRoleId",
                table: "RoleProjectRoles",
                newName: "ProjectSubjectRoleId");

            migrationBuilder.RenameIndex(
                name: "IX_RoleProjectRoles_ProjectRoleId",
                table: "RoleProjectRoles",
                newName: "IX_RoleProjectRoles_ProjectSubjectRoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_RoleProjectRoles_SubjectRoles_ProjectSubjectRoleId",
                table: "RoleProjectRoles",
                column: "ProjectSubjectRoleId",
                principalTable: "SubjectRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoleProjectRoles_SubjectRoles_ProjectSubjectRoleId",
                table: "RoleProjectRoles");

            migrationBuilder.RenameColumn(
                name: "ProjectSubjectRoleId",
                table: "RoleProjectRoles",
                newName: "ProjectRoleId");

            migrationBuilder.RenameIndex(
                name: "IX_RoleProjectRoles_ProjectSubjectRoleId",
                table: "RoleProjectRoles",
                newName: "IX_RoleProjectRoles_ProjectRoleId");

            migrationBuilder.CreateTable(
                name: "ProjectRole",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectRole", x => x.ID);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_RoleProjectRoles_ProjectRole_ProjectRoleId",
                table: "RoleProjectRoles",
                column: "ProjectRoleId",
                principalTable: "ProjectRole",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
