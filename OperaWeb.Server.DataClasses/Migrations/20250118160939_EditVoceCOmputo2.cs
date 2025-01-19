﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OperaWeb.Server.DataClasses.Migrations
{
    /// <inheritdoc />
    public partial class EditVoceCOmputo2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "Prezzo",
                table: "VociComputo",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Prezzo",
                table: "VociComputo");
        }
    }
}
