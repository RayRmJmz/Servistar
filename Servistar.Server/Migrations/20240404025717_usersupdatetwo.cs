using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Servistar.Server.Migrations
{
    /// <inheritdoc />
    public partial class usersupdatetwo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Active",
                table: "AspNetUsers",
                type: "bit",
                nullable: true,
                defaultValue: true);

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "99999999",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "ff3f3001-8003-4c46-945f-18bc16c0314e", "AQAAAAIAAYagAAAAEMTCXTL8sBAnizFEtyvKWSkYVnOqF7v8Vul+FA6NRoPgBFHz95WZOtBSnzAfZqUsOA==", "603c75ff-f11f-499a-a264-072cc126682d" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Active",
                table: "AspNetUsers");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "99999999",
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "b38cacec-c553-4979-8cf1-00f20e0556ac", "AQAAAAIAAYagAAAAELIn+URjCOrI28k/Bi0pDuf/9MOxldLveQn+f2hU2O3nPnqXTN5mU+RjjyPcco+6sQ==", "e4d86200-e3e1-41be-a47b-124e4ea1a88a" });
        }
    }
}
