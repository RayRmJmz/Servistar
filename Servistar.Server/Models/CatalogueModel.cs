namespace Servistar.Server.Models
{
    public class BrandsRequestModel
    {
        public string Brand { get; set; }
    }

    public class BrandsResponseModel
    {
        public int Id { get; set; }
        public string Brand { get; set; }
    }

    public class ApplianceRequestModel
    {
        public string Appliance { get; set; }
    }

    public class ApplianceResponseModel
    {
        public int Id { get; set; }
        public string Appliance { get; set; }
    }
}
