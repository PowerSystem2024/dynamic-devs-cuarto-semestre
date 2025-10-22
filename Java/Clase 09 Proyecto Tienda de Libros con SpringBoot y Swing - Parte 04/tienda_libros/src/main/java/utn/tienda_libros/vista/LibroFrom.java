package utn.tienda_libros.vista;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import utn.tienda_libros.modelo.Libro;
import utn.tienda_libros.servicio.LibroServicio;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

@Component
public class LibroFrom extends JFrame {
    LibroServicio libroServicio;
    private JPanel panel;
    private JTable tablaLibros;
    private JTextField idTexto;
    private JTextField libroTexto;
    private JTextField autorTexto;
    private JTextField precioTexto;
    private JTextField existenciasTexto;
    private JButton agregarButton;
    private JButton modificarButton;
    private JButton eliminarButton;
    private DefaultTableModel tablaModeloLibros;

    @Autowired
    public LibroFrom(LibroServicio libroServicio) {
        this.libroServicio = libroServicio;
        iniciarForma();

        agregarButton.addActionListener(e -> agregarLibro());

        tablaLibros.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                super.mouseClicked(e);
                cargarLibroSeleccionado();
            }
        });

        modificarButton.addActionListener(e -> modificarLibro());
        eliminarButton.addActionListener(e -> eliminarLibro());
    }

    private void iniciarForma() {
        setContentPane(panel);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setVisible(true);
        setSize(900, 700);
        //Para obtener las dimensiones de la ventana
        Toolkit toolkit = Toolkit.getDefaultToolkit();
        Dimension tamanioPantalla = toolkit.getScreenSize();
        int x = (tamanioPantalla.width - this.getWidth()) / 2;
        int y = (tamanioPantalla.height - this.getHeight()) / 2;
        setLocation(x, y);
    }

    private void agregarLibro() {
        //Leer lo valores del formulario
        if (libroTexto.getText().equals("")) {
            mostrarMensaje("Ingresa el nombre del libro");
            libroTexto.requestFocusInWindow();
            return;
        }
        var nombreLibro = libroTexto.getText();
        var autor = autorTexto.getText();
        var precio = Double.parseDouble(precioTexto.getText());
        var existencias = Integer.parseInt(existenciasTexto.getText());

        // Validar si el libro ya existe
        if (libroYaExiste(nombreLibro, autor)) {
            mostrarMensaje("Este libro ya existe en la base de datos");
            libroTexto.requestFocusInWindow();
            return;
        }

        //Creamos el objeto libro
        var libro = new Libro(null, nombreLibro, autor, precio, existencias);
        //libro.setNombreLibro(nombreLibro);
        //libro.setAutor(autor);
        //libro.setPrecio(precio);
        //libro.setExistenias(existencias);
        this.libroServicio.guardarLibro(libro);
        mostrarMensaje("Libro agregado");
        limpiarFormulario();
        listarLibros();

    }

    // Metodo para verificar si el libro ya existe
    private boolean libroYaExiste(String nombreLibro, String autor) {
        var libros = libroServicio.listarLibros();
        return libros.stream()
                .anyMatch(libro ->
                        libro.getNombreLibro().equalsIgnoreCase(nombreLibro) &&
                                libro.getAutor().equalsIgnoreCase(autor)
                );
    }

    private void cargarLibroSeleccionado() {
        // los indices de la columna inician en cero
        var reglon = tablaLibros.getSelectedRow();
        if (reglon != -1) {
            String idLibro = tablaLibros.getModel().getValueAt(reglon, 0).toString();
            idTexto.setText(idLibro);
            String nombreLibro = tablaLibros.getModel().getValueAt(reglon, 1).toString();
            libroTexto.setText(nombreLibro);
            String autorLibro = tablaLibros.getModel().getValueAt(reglon, 2).toString();
            autorTexto.setText(autorLibro);
            String precio = tablaLibros.getModel().getValueAt(reglon, 3).toString();
            precioTexto.setText(precio);
            String existencias = tablaLibros.getModel().getValueAt(reglon, 4).toString();
            existenciasTexto.setText(existencias);
        }
    }

    private void modificarLibro() {
        if (this.idTexto.getText().equals("")) {
            mostrarMensaje("Debes seleccionar un registro en la tabla");
        } else {
            // verificamos que el nombre del libro no sea nulo
            if (this.libroTexto.getText().equals("")) {
                mostrarMensaje("Ingrese el nombre del libro...");
                libroTexto.requestFocusInWindow();
                return;
            }
            // lenamos el objeto libro a actualizar
            int idLibro = Integer.parseInt(this.idTexto.getText());
            var nombreLibro = libroTexto.getText();
            var autorLibro = autorTexto.getText();
            var precio = Double.parseDouble(precioTexto.getText());
            var existencias = Integer.parseInt(existenciasTexto.getText());
            var libro = new Libro(idLibro, nombreLibro, autorLibro, precio, existencias);
            libroServicio.guardarLibro(libro);
            mostrarMensaje("Libro modificado...");
            limpiarFormulario();
            listarLibros();
        }
    }

    private void eliminarLibro() {
        var reglon = tablaLibros.getSelectedRow();
        if (reglon != -1) {
            String idLibro = tablaLibros.getModel().getValueAt(reglon, 0).toString();
            var libro = new Libro();
            libro.setIdLibro(Integer.parseInt(idLibro));
            libroServicio.eliminarLibro(libro);
            mostrarMensaje("Libro " + idLibro + " ELIMINADO");
            limpiarFormulario();
            listarLibros();
        } else {
            mostrarMensaje("No se ha seleccionado ningún libro de la tabla a eliminar.");
        }
    }

    private void limpiarFormulario() {
        libroTexto.setText("");
        autorTexto.setText("");
        precioTexto.setText("");
        existenciasTexto.setText("");
    }

    private void mostrarMensaje(String mensaje) {
        JOptionPane.showMessageDialog(this, mensaje);
    }

    private void createUIComponents() {
        idTexto = new JTextField("");
        idTexto.setVisible(false);
        this.tablaModeloLibros = new DefaultTableModel(0, 5) {
            @Override
            public boolean isCellEditable(int row, int column) {
                return false;
            }
        };
        String[] cabecera = {"Id", "Libro", "Autor", "Precio", "Existencias"};
        this.tablaModeloLibros.setColumnIdentifiers(cabecera);
        //Instanciar el objeto de JTable
        this.tablaLibros = new JTable(tablaModeloLibros);
        tablaLibros.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
        listarLibros();
    }

    private void listarLibros() {
        //Limpiar la tabla
        tablaModeloLibros.setRowCount(0);
        //Obtener los libros de la BD
        var libros = libroServicio.listarLibros();
        //Iteramos cada libro
        libros.forEach((libro) -> {
            //Creamos cada registro para agregarlos a la tabla
            Object[] renglonLibro = {
                    libro.getIdLibro(),
                    libro.getNombreLibro(),
                    libro.getAutor(),
                    libro.getPrecio(),
                    libro.getExistenias()
            };
            this.tablaModeloLibros.addRow(renglonLibro);

        });
    }
}
