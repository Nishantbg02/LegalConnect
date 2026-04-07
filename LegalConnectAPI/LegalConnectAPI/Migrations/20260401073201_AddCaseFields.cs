using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LegalConnectAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddCaseFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CaseDetails",
                table: "Appointments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DocumentPath",
                table: "Appointments",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CaseDetails",
                table: "Appointments");

            migrationBuilder.DropColumn(
                name: "DocumentPath",
                table: "Appointments");
        }
    }
}
