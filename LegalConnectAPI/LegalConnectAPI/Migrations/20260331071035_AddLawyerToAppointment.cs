using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LegalConnectAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddLawyerToAppointment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "LawyerName",
                table: "Appointments",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LawyerName",
                table: "Appointments");
        }
    }
}
