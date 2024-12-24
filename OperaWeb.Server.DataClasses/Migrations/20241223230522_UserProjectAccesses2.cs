using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OperaWeb.Server.DataClasses.Migrations
{
    /// <inheritdoc />
    public partial class UserProjectAccesses2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserProjectAccess_AspNetUsers_UserId",
                table: "UserProjectAccess");

            migrationBuilder.DropForeignKey(
                name: "FK_UserProjectAccess_Projects_ProjectId",
                table: "UserProjectAccess");

            migrationBuilder.AddForeignKey(
                name: "FK_UserProjectAccess_AspNetUsers_UserId",
                table: "UserProjectAccess",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserProjectAccess_Projects_ProjectId",
                table: "UserProjectAccess",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserProjectAccess_AspNetUsers_UserId",
                table: "UserProjectAccess");

            migrationBuilder.DropForeignKey(
                name: "FK_UserProjectAccess_Projects_ProjectId",
                table: "UserProjectAccess");

            migrationBuilder.AddForeignKey(
                name: "FK_UserProjectAccess_AspNetUsers_UserId",
                table: "UserProjectAccess",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserProjectAccess_Projects_ProjectId",
                table: "UserProjectAccess",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
