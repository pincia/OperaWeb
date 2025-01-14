using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OperaWeb.Server.DataClasses.Migrations
{
    /// <inheritdoc />
    public partial class AppUSeredit2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectSubjects_Invitations_InvitationId",
                table: "ProjectSubjects");

            migrationBuilder.AlterColumn<int>(
                name: "InvitationId",
                table: "ProjectSubjects",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectSubjects_Invitations_InvitationId",
                table: "ProjectSubjects",
                column: "InvitationId",
                principalTable: "Invitations",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectSubjects_Invitations_InvitationId",
                table: "ProjectSubjects");

            migrationBuilder.AlterColumn<int>(
                name: "InvitationId",
                table: "ProjectSubjects",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectSubjects_Invitations_InvitationId",
                table: "ProjectSubjects",
                column: "InvitationId",
                principalTable: "Invitations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
