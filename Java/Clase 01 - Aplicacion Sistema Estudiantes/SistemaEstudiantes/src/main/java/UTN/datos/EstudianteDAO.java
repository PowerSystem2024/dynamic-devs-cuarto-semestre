package UTN.datos;

import UTN.dominio.Estudiante;
import static UTN.conexion.Conexion.getConnection;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class EstudianteDAO {
    //Metodo listar
    public List<Estudiante> listarEstudiantes(){
        List<Estudiante> estudiantes = new ArrayList<>();
        //Creamos algunos objetos que son necesarios para comunicarnos con la base de datos
        PreparedStatement ps;//ayuda a preparar la sentencia sql que vamos a ejecutar hacia la base de datos
        ResultSet rs;//nos permite alamacenar el resultado que obtenemos desde la base de datos
        //Creamos un objeto de tipo conxión
        Connection con = getConnection();
        String sql = "SELECT * FROM estudiantes2025 ORDER BY idestudiantes2025";
        try{
            ps = con.prepareStatement(sql);
            rs = ps.executeQuery();
            while(rs.next()){
                var estudiante = new Estudiante();
                estudiante.setIdEstudiante(rs.getInt("idestudiantes2025"));
                estudiante.setNombre(rs.getString("nombre"));
                estudiante.setApellido(rs.getString("apellido"));
                estudiante.setTelefono(rs.getString("telefono"));
                estudiante.setEmail(rs.getString("email"));
                //agrego a la lista
                estudiantes.add(estudiante);
            }
        }catch(Exception e){
            System.out.println("Ocurrio un error al seleccionar datos: "+e.getMessage());
        }
        finally{
            try{
                con.close();
            }catch(Exception e){
                System.out.println("Ocurrio un error al cerrar conexion: "+e.getMessage());
            }
        }//fin finally
        return estudiantes;

    }//fin metodo listar

    //metodo por id -> fin by id
    public boolean buscarEstudiantePorId(Estudiante estudiante){
        PreparedStatement ps;
        ResultSet rs;
        Connection con = getConnection();
        String sql = "SELECT * FROM estudiantes2025 WHERE idestudiantes2025 = ?";
        try{
            ps = con.prepareStatement(sql);
            ps.setInt(1,estudiante.getIdEstudiante());
            rs = ps.executeQuery();
            if(rs.next()){
                estudiante.setNombre(rs.getString("nombre"));
                estudiante.setApellido(rs.getString("apellido"));
                estudiante.setTelefono(rs.getString("telefono"));
                estudiante.setEmail(rs.getString("email"));
                return true;//se encontro un registro
            }//fin if
        }catch(Exception e){
            System.out.println("Ocurrio un error al buscar estudiante: "+e.getMessage());
        }
        finally{
            try{
                con.close();
            }catch(Exception e){
                System.out.println("Ocurrio un error al cerrar conexion: "+e.getMessage());
            }//fin catch
        }//fin finally
        return false;
    }
    //metodo agregar un nuevo estudiante
    public boolean agregarEstudiante(Estudiante estudiante){
        PreparedStatement ps;
        Connection con = getConnection();
        String sql = "INSERT INTO estudiantes2025 (nombre, apellido, telefono, email) VALUES (?, ?, ?, ?)";
        try{
            ps = con.prepareStatement(sql);
            ps.setString(1, estudiante.getNombre());
            ps.setString(2, estudiante.getApellido());
            ps.setString(3, estudiante.getTelefono());
            ps.setString(4, estudiante.getEmail());
            ps.execute();
            return true;
        }catch(Exception e){
            System.out.println("Ocurrio un error al agregar estudiante: "+e.getMessage());
        }//fin del catch
        finally{
            try{
                con.close();
            }catch(Exception e){
                System.out.println("Ocurrio un error al cerrar conexion: "+e.getMessage());
            }//fin del catch
        }//fin del finally
        return false;
    }

    //Modificar estudiante
    public boolean modificarEstudiante(Estudiante estudiante){
        PreparedStatement ps;
        Connection con = getConnection();
        String sql = "UPDATE estudiantes2025 SET nombre=? , apellido=?, telefono=?, email=? WHERE idestudiantes2025=?";
        try{
            ps= con.prepareStatement(sql);
            ps.setString(1,estudiante.getNombre());
            ps.setString(2,estudiante.getApellido());
            ps.setString(3,estudiante.getTelefono());
            ps.setString(4,estudiante.getEmail());
            ps.setInt(5,estudiante.getIdEstudiante());
            ps.execute();
            return true;
        } catch (SQLException e) {
            System.out.println("Ocurrio un error al modificar estudiante: "+e.getMessage());
        }
        finally{
            try{
                con.close();
            }catch(Exception e){
                System.out.println("Ocurrio un error al cerrar conexion: "+e.getMessage());
            }
        }
        return  false;
    }
    //Eliminar estudiante
    public boolean eliminarEstudiante(Estudiante estudiante){
        PreparedStatement ps;
        Connection con = getConnection();
        String sql = "DELETE FROM estudiantes2025 WHERE idestudiantes2025=?";
        try{
            ps= con.prepareStatement(sql);
            ps.setInt(1,estudiante.getIdEstudiante());
            ps.execute();
            return true;
        } catch (SQLException e) {
            System.out.println("Ocurrio un error al eliminar estudiante: "+e.getMessage());
        }
        finally{
            try{
                con.close();
            }catch(Exception e){
                System.out.println("Ocurrio un error al cerrar conexion: "+e.getMessage());
            }
        }
        return  false;
    }

    public static void main(String[] args) {
        var estudianteDAO = new EstudianteDAO();
        //MOdificar estudiante
        //var estudianteModificado = new Estudiante(1, "Juan carlos", "Juarez", "54165131651", "Juan@gmail.com");
        //var modifiado= estudianteDAO.modificarEstudiante(estudianteModificado);
        //if(modifiado)
        //    System.out.println("Estudiante modificado correctamente:  "+estudianteModificado);
        //else
        //    System.out.println("Estudiante modificado incorrecto:  "+estudianteModificado);
        //agregar estudiante
        //var nuevoEstudiante = new Estudiante("Carlos","Lara","260465145","carlos@gmail.com");
        //var agregado = estudianteDAO.agregarEstudiante(nuevoEstudiante);
        //if(agregado)
        //    System.out.println("Estudiante agregado: "+nuevoEstudiante);
        //else
        //    System.out.println("Estudiante no agregado: "+nuevoEstudiante);

        //Eliminar estudiante con id 5
        var estudianteEliminar = new Estudiante(5);
        var eliminado = estudianteDAO.eliminarEstudiante(estudianteEliminar);
        if(eliminado)
            System.out.println("Estudiante eliminado correctamente:  "+estudianteEliminar);
        else
            System.out.println("Estudiante no eliminado:  "+estudianteEliminar);

        //Listar los estudiantes
        System.out.println("Listado de estudiantes");
        List<Estudiante> estudiantes = estudianteDAO.listarEstudiantes();
        estudiantes.forEach(System.out::println);//Funcion lambda para imprimir

        //buscar por id
        //var estudiante1 = new Estudiante(1);
        //System.out.println("Estudiantes antes de la busqueda: "+estudiante1);
        //var encontrado= estudianteDAO.buscarEstudiantePorId(estudiante1);
        //if(encontrado)
        //    System.out.println("Estudiante encontrado: "+estudiante1);
        //else
        //    System.out.println("Estudiante no encontrado: "+estudiante1.getIdEstudiante());


    }
}
