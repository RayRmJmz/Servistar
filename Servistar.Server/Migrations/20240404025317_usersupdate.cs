using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Servistar.Server.Migrations
{
    /// <inheritdoc />
    public partial class usersupdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "BirthDate",
                table: "AspNetUsers",
                type: "Date",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LastName",
                table: "AspNetUsers",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NNS",
                table: "AspNetUsers",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "AspNetUsers",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SecondLastName",
                table: "AspNetUsers",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "StartedDate",
                table: "AspNetUsers",
                type: "Date",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "TerminationDate",
                table: "AspNetUsers",
                type: "Date",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "99999999",
                columns: new[] { "BirthDate", "ConcurrencyStamp", "LastName", "NNS", "Name", "PasswordHash", "SecondLastName", "SecurityStamp", "StartedDate", "TerminationDate" },
                values: new object[] { null, "b38cacec-c553-4979-8cf1-00f20e0556ac", null, null, null, "AQAAAAIAAYagAAAAELIn+URjCOrI28k/Bi0pDuf/9MOxldLveQn+f2hU2O3nPnqXTN5mU+RjjyPcco+6sQ==", null, "e4d86200-e3e1-41be-a47b-124e4ea1a88a", null, null });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BirthDate",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "LastName",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "NNS",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "SecondLastName",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "StartedDate",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "TerminationDate",
                table: "AspNetUsers");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "99999999",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "955c58d8-a2bf-481e-b5cd-70abee9f9cec", "AQAAAAIAAYagAAAAEAruxuQR3Al0gMquO3m4Y5VMtD5rmSWL2snKk5qnzL4vQAC7t8QOWzz5ELQacqMrpg==", "9ec2679e-2ef4-407d-a0ea-ecda4cd57a87" });
        }
    }
}
