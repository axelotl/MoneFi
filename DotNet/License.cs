using Stripe;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Sabio.Models.Domain
{
    public class License
    {
        public int Id { get; set; }
       public LookUp3Col State { get; set; }
        public string LicenseNumber { get; set; }
        public DateTime DateAdmitted { get; set; } 
        public DateTime DateCreated { get; set; }
        public BaseUser CreatedBy { get; set; }
        public bool IsActive { get; set; }
    }
}
