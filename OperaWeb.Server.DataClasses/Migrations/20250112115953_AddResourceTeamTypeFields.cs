using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OperaWeb.Server.DataClasses.Migrations
{
    /// <inheritdoc />
    public partial class AddResourceTeamTypeFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ResourceTeamTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProjectId = table.Column<int>(type: "int", nullable: false),
                    SpecializedQuantity = table.Column<int>(type: "int", nullable: false),
                    SpecializedHourlyRate = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    QualifiedQuantity = table.Column<int>(type: "int", nullable: false),
                    QualifiedHourlyRate = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    CommonQuantity = table.Column<int>(type: "int", nullable: false),
                    CommonHourlyRate = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ResourceTeamTypes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ResourceTeamTypes_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ResourceTeamTypes_ProjectId",
                table: "ResourceTeamTypes",
                column: "ProjectId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ResourceTeamTypes");
        }
    }
}
