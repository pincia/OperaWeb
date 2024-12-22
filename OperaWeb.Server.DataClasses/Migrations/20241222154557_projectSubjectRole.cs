using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OperaWeb.Server.DataClasses.Migrations
{
    /// <inheritdoc />
    public partial class projectSubjectRole : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Soa_SoaCategoryId",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "SoaCategoryd",
                table: "Projects");

            migrationBuilder.AddColumn<int>(
                name: "ProjectSubjectRoleId",
                table: "ProjectSubjects",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "ProjectSubjects",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<int>(
                name: "SoaCategoryId",
                table: "Projects",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "SubjectRoles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubjectRoles", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProjectSubjects_ProjectSubjectRoleId",
                table: "ProjectSubjects",
                column: "ProjectSubjectRoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Soa_SoaCategoryId",
                table: "Projects",
                column: "SoaCategoryId",
                principalTable: "Soa",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectSubjects_SubjectRoles_ProjectSubjectRoleId",
                table: "ProjectSubjects",
                column: "ProjectSubjectRoleId",
                principalTable: "SubjectRoles",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Soa_SoaCategoryId",
                table: "Projects");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectSubjects_SubjectRoles_ProjectSubjectRoleId",
                table: "ProjectSubjects");

            migrationBuilder.DropTable(
                name: "SubjectRoles");

            migrationBuilder.DropIndex(
                name: "IX_ProjectSubjects_ProjectSubjectRoleId",
                table: "ProjectSubjects");

            migrationBuilder.DropColumn(
                name: "ProjectSubjectRoleId",
                table: "ProjectSubjects");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "ProjectSubjects");

            migrationBuilder.AlterColumn<int>(
                name: "SoaCategoryId",
                table: "Projects",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "SoaCategoryd",
                table: "Projects",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Soa_SoaCategoryId",
                table: "Projects",
                column: "SoaCategoryId",
                principalTable: "Soa",
                principalColumn: "Id");
        }
    }
}
