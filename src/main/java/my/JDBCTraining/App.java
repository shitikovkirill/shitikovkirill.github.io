package my.JDBCTraining;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Properties;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args )
    {
        System.out.println( "Hello World!" );
        //DBConnection connect = new DBConnection("localhost","","","test");
        //connect.initProperties();
        //connect.init();
        
       String url="jdbc:mysql://localhost/test";
		
       Properties properties = new Properties();
		//host    //polzov
       properties.setProperty("user", "");
       properties.setProperty("password", "");
       properties.setProperty("characterEncoding", "UTF-8");
       properties.setProperty("useUnocode", "true");

       System.out.println("URL "+url);
       DBConnection connect = new DBConnection(properties,url);
       connect.init();
       //INSERT
       //TRUNCATE
       //Create
      // connect.updateQuery("INSERT INTO user(login, password) VALUES ('Igor','1111')");
      // ResultSet resultUser = connect.query("Select * from user");
       
       ResultSet resultUser = connect.query("Select * from user WHERE login =?","Igor");
       try {
		while(resultUser.next()){
			int i = resultUser.getInt("id");
		String login =	resultUser.getString("login");
		String pas =	resultUser.getString(3);
			
		System.out.println(i+" login: "+login+ " pas: "+pas);	   
		   }
	} catch (SQLException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
       
    }
}
