using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OperaWeb.Server.DataClasses.Migrations
{
    /// <inheritdoc />
    public partial class ProjectRole3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectSubjects_SubjectRoles_ProjectSubjectRoleId",
                table: "ProjectSubjects");

            migrationBuilder.DropForeignKey(
                name: "FK_RoleProjectRoles_SubjectRoles_ProjectSubjectRoleId",
                table: "RoleProjectRoles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SubjectRoles",
                table: "SubjectRoles");

            migrationBuilder.RenameTable(
                name: "SubjectRoles",
                newName: "ProjectSubjectRole");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProjectSubjectRole",
                table: "ProjectSubjectRole",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectSubjects_ProjectSubjectRole_ProjectSubjectRoleId",
                table: "ProjectSubjects",
                column: "ProjectSubjectRoleId",
                principalTable: "ProjectSubjectRole",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RoleProjectRoles_ProjectSubjectRole_ProjectSubjectRoleId",
                table: "RoleProjectRoles",
                column: "ProjectSubjectRoleId",
                principalTable: "ProjectSubjectRole",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectSubjects_ProjectSubjectRole_ProjectSubjectRoleId",
                table: "ProjectSubjects");

            migrationBuilder.DropForeignKey(
                name: "FK_RoleProjectRoles_ProjectSubjectRole_ProjectSubjectRoleId",
                table: "RoleProjectRoles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProjectSubjectRole",
                table: "ProjectSubjectRole");

            migrationBuilder.RenameTable(
                name: "ProjectSubjectRole",
                newName: "SubjectRoles");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SubjectRoles",
                table: "SubjectRoles",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectSubjects_SubjectRoles_ProjectSubjectRoleId",
                table: "ProjectSubjects",
                column: "ProjectSubjectRoleId",
                principalTable: "SubjectRoles",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RoleProjectRoles_SubjectRoles_ProjectSubjectRoleId",
                table: "RoleProjectRoles",
                column: "ProjectSubjectRoleId",
                principalTable: "SubjectRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
