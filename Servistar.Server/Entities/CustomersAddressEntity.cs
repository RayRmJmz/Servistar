using System.ComponentModel.DataAnnotations.Schema;

namespace Servistar.Server.Entities
{
    public class CustomersAddressEntity : Address
    {
        public int CustomerId { get; set; }

        [ForeignKey("CustomerId")]
        public virtual CustumersEntity? Customer { get; set; }
    }
}
