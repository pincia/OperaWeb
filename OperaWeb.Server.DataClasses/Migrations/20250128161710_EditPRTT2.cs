using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OperaWeb.Server.DataClasses.Migrations
{
    /// <inheritdoc />
    public partial class EditPRTT2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectResourceTeamType_Projects_ProjectId",
                table: "ProjectResourceTeamType");

            migrationBuilder.DropIndex(
                name: "IX_ProjectResourceTeamType_ProjectId",
                table: "ProjectResourceTeamType");

            migrationBuilder.RenameColumn(
                name: "ProjectId",
                table: "ProjectResourceTeamType",
                newName: "ProjectID");

            migrationBuilder.AlterColumn<int>(
                name: "ProjectID",
                table: "ProjectResourceTeamType",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectResourceTeamType_ProjectID",
                table: "ProjectResourceTeamType",
                column: "ProjectID",
                unique: true,
                filter: "[ProjectID] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectResourceTeamType_Projects_ProjectID",
                table: "ProjectResourceTeamType",
                column: "ProjectID",
                principalTable: "Projects",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectResourceTeamType_Projects_ProjectID",
                table: "ProjectResourceTeamType");

            migrationBuilder.DropIndex(
                name: "IX_ProjectResourceTeamType_ProjectID",
                table: "ProjectResourceTeamType");

            migrationBuilder.RenameColumn(
                name: "ProjectID",
                table: "ProjectResourceTeamType",
                newName: "ProjectId");

            migrationBuilder.AlterColumn<int>(
                name: "ProjectId",
                table: "ProjectResourceTeamType",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProjectResourceTeamType_ProjectId",
                table: "ProjectResourceTeamType",
                column: "ProjectId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectResourceTeamType_Projects_ProjectId",
                table: "ProjectResourceTeamType",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
