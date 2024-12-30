using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OperaWeb.Server.DataClasses.Migrations
{
    /// <inheritdoc />
    public partial class AddEconomicsToProject : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Economics",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProjectId = table.Column<int>(type: "int", nullable: false),
                    LMS = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    LCP = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    CSI = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    CMO = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    VBA = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    SAD = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TTP = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Economics", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Economics_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Economics_ProjectId",
                table: "Economics",
                column: "ProjectId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Economics");
        }
    }
}
