using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OperaWeb.Server.DataClasses.Migrations
{
    /// <inheritdoc />
    public partial class SubjectEdits : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Company",
                table: "ProjectSubjects",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "InvitationId",
                table: "ProjectSubjects",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Cf",
                table: "Invitations",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectSubjects_InvitationId",
                table: "ProjectSubjects",
                column: "InvitationId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectSubjects_Invitations_InvitationId",
                table: "ProjectSubjects",
                column: "InvitationId",
                principalTable: "Invitations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectSubjects_Invitations_InvitationId",
                table: "ProjectSubjects");

            migrationBuilder.DropIndex(
                name: "IX_ProjectSubjects_InvitationId",
                table: "ProjectSubjects");

            migrationBuilder.DropColumn(
                name: "Company",
                table: "ProjectSubjects");

            migrationBuilder.DropColumn(
                name: "InvitationId",
                table: "ProjectSubjects");

            migrationBuilder.DropColumn(
                name: "Cf",
                table: "Invitations");
        }
    }
}
