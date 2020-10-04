const controller = {};

///////////////////////PACIEMTES//////////////////



//////////////
controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    
  
    conn.query('SELECT *  FROM pacientes ',  (err, customers) => {
      

      
     res.render('pacientes', {
        data: customers
     });
    });
  });
};


////////////////////////////Nuevo Paciente/////////////////////////////////////////////////



controller.nuevo = (req, res) => {
  res.render('nuevoPaciente', {   

      });
};

controller.nPaciente = (req, res) => {
  const data = req.body;
  
  req.getConnection((err, conn) => {
  conn.query('INSERT INTO pacientes set ?', [data], (err, rows) => {
  
      console.log(rows);
      res.redirect('/');
  });
  })
  };
///////////////////EDITAR PACIEMTE//////////////////////7

  controller.EditPaciente = (req, res) => {
    const { rfc } = req.params;
    req.getConnection((err, conn) => {
      conn.query(" SELECT * FROM pacientes INNER JOIN bancos  ON pacientes.Bancos_idBanco = bancos.idBanco WHERE rfc = ? ", [rfc], 
      (err, rows) => {
        res.render('pacieEdit', {
          data: rows[0]
        })
      });
    });
  };



  controller.actualizarPaciente = (req, res) => {
    const { rfc } = req.params;
    const newCustomer = req.body;
    req.getConnection((err, conn) => {
  
    conn.query('UPDATE pacientes set ? where rfc = ?', [newCustomer, rfc], (err, rows) => {
      
    });
    });
  };
  
////////////////////////////////////////7



/////////////////////////Traslado buscar///////////////////////////////////////////////



controller.traslado = (req, res) => {
  req.getConnection((err, conn) => {
    const { rfc } = req.params;
    conn.query('SELECT * FROM traslados INNER JOIN pacientes  ON traslados.Pacientes_rfc = pacientes.rfc WHERE rfc = ?', [rfc],
    (err, customers) =>  {
     
     res.render('buscarTras', {
        data: customers
     });
    });
  });
};




///////////////////////////////Trsalado HIstorial///////////////////////////////////////////////////////////////////////7

controller.HistTraslado = (req, res) => {
  const { Folios_idFolios } = req.params;
  req.getConnection((err, conn) => {
    conn.query(" SELECT * From  traslados INNER JOIN  pacientes ON traslados.Pacientes_rfc =  pacientes.rfc  INNER JOIN bancos  ON pacientes.Bancos_idBanco = bancos.idBanco    INNER JOIN destinos  ON destinos.idDestinos = traslados.Destinos_idDestinos INNER JOIN salidas  ON salidas.idSalidas = traslados.Salidas_idSalidas WHERE Folios_idFolios = ? ", [Folios_idFolios], 
    (err, rows) => {
      res.render('HistoTras', {
        data: rows[0]
      })
    });
  });
};

////////////Historial editar traslado////////////

controller.EditReportarHist = (req, res) => {
  const { Folios_idFolios } = req.params;
  req.getConnection((err, conn) => {
    conn.query(" SELECT * From  traslados INNER JOIN  pacientes ON traslados.Pacientes_rfc =  pacientes.rfc  INNER JOIN bancos  ON pacientes.Bancos_idBanco = bancos.idBanco    INNER JOIN destinos  ON destinos.idDestinos = traslados.Destinos_idDestinos INNER JOIN salidas  ON salidas.idSalidas = traslados.Salidas_idSalidas WHERE Folios_idFolios = ? ", [Folios_idFolios], 
    (err, rows) => {
      res.render('historialEdit', {
        data: rows[0]
      })
    });
  });
};



controller.actualizarTrasladoHist = (req, res) => {
  const { Folios_idFolios } = req.params;
  const newCustomer = req.body;
  req.getConnection((err, conn) => {

  conn.query('UPDATE traslados set ? where Folios_idFolios = ?', [newCustomer, Folios_idFolios], (err, rows) => {
    
  });
  });
};

////////////////////////////////formulario REEVIO yGuardar Reporte//////////////////////////////////////////

controller.repo = (req, res) => {
  const { rfc } = req.params;
  req.getConnection((err, conn) => {
    conn.query(" SELECT * FROM pacientes INNER JOIN bancos  ON pacientes.Bancos_idBanco = bancos.idBanco WHERE rfc = ? ", [rfc], 
    (err, rows) => {
      res.render('formulario', {
        data: rows[0]
      })
    });
  });
};

controller.save = (req, res) => {
  const data = req.body;
  console.log(req.body)
  req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO traslados set ?', data, (err, customer) => {
      console.log(customer)
       
    })
  })
};

//////////////////////////////Editar reporte///////////////////////////////////////


controller.EditReportar = (req, res) => {
  const { Folios_idFolios } = req.params;
  req.getConnection((err, conn) => {
    conn.query(" SELECT * From  traslados INNER JOIN  pacientes ON traslados.Pacientes_rfc =  pacientes.rfc  INNER JOIN bancos  ON pacientes.Bancos_idBanco = bancos.idBanco    INNER JOIN destinos  ON destinos.idDestinos = traslados.Destinos_idDestinos INNER JOIN salidas  ON salidas.idSalidas = traslados.Salidas_idSalidas WHERE Folios_idFolios = ? ", [Folios_idFolios], 
    (err, rows) => {
      res.render('actReporte', {
        data: rows[0]
      })
    });
  });
};



controller.actualizarTraslado = (req, res) => {
  const { Folios_idFolios } = req.params;
  const newCustomer = req.body;
  req.getConnection((err, conn) => {

  conn.query('UPDATE traslados set ? where Folios_idFolios = ?', [newCustomer, Folios_idFolios], (err, rows) => {
    
  });
  });
};






////////////////////////////PDF REEVIO Reporte Formulario  //////////////////////////////////7

controller.pdfselect = (req, res) => {
  const { rfc } = req.params;
  req.getConnection((err, conn) => {
    conn.query(" SELECT * From  traslados INNER JOIN  pacientes ON traslados.Pacientes_rfc =  pacientes.rfc  INNER JOIN bancos  ON pacientes.Bancos_idBanco = bancos.idBanco    INNER JOIN destinos  ON destinos.idDestinos = traslados.Destinos_idDestinos INNER JOIN salidas  ON salidas.idSalidas = traslados.Salidas_idSalidas WHERE rfc = ?  ORDER BY Folios_idFolios DESC LIMIT 0, 1 ", [rfc], 
    (err, rows) => {
      res.render('imppdf', {
        data: rows[0]
      })
    });
  });
};



///////////////////////////////ELIMIAR////////////////////////////////////////

controller.delete = (req, res) => {
  const { rfc } = req.params;
  req.getConnection((err, connection) => {
    connection.query('DELETE FROM pacientes WHERE rfc = ?', [rfc], (err, rows) => {
      res.redirect('/');
    });
  });
}


///////////////////EDITAR PACIEMTE FORM//////////////////////7

controller.EditPacienteForm = (req, res) => {
  const { rfc } = req.params;
  req.getConnection((err, conn) => {
    conn.query(" SELECT * FROM pacientes INNER JOIN bancos  ON pacientes.Bancos_idBanco = bancos.idBanco WHERE rfc = ? ", [rfc], 
    (err, rows) => {
      res.render('editarpacForm', {
        data: rows[0]
      })
    });
  });
};



controller.actualizarPacienteForm = (req, res) => {
  const { rfc } = req.params;
  const newCustomer = req.body;
  req.getConnection((err, conn) => {

  conn.query('UPDATE pacientes set ? where rfc = ?', [newCustomer, rfc], (err, rows) => {
    res.redirect('/');
  });
  });
};

////////////////////////////////////////7










module.exports = controller;
