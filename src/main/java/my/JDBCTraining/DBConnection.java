package my.JDBCTraining;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;

public class DBConnection {
	private String host;
	private String root;
	private String password;
	private String nameDB;
	private String url;
	
	private Properties properties = new Properties();
	private Connection mysqlConnection = null;
	private Statement statement;
	
	public DBConnection(Properties properties,
						String url){
		this.properties=properties;
		this.url=url;
	}
	
	public DBConnection(String host,
						String root,
						String password,
						String nameDB){
		this.host=host;
		this.root=root;
		this.password=password;
		this.nameDB=nameDB;
	}
	public void initProperties(){
		
		url="jdbc:mysql://"+host+"/"+nameDB;
		
							//host    //polzov
		properties.setProperty("user", root);
		properties.setProperty("password", password);
		properties.setProperty("characterEncoding", "UTF-8");
		properties.setProperty("useUnocode", "true");
		
		System.out.println("URL "+url);
	}
	
	public void init(){
		if(mysqlConnection==null){
		try {
			Class.forName("com.mysql.jdbc.Driver");
			mysqlConnection = DriverManager.getConnection(url);
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		}
	}
	public ResultSet query(String query){
		ResultSet resultSet=null;
		try {
			statement = mysqlConnection.createStatement();
			resultSet = statement.executeQuery(query);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return resultSet;
	}
	public ResultSet query(String query, String logic){
		ResultSet resultSet=null;
		try {
			PreparedStatement statement = mysqlConnection.prepareStatement(query);
			statement.setString(1, logic);
			resultSet=statement.executeQuery();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return resultSet;
	}
	public void queryUpdate(String query){
		try {
			
			statement = mysqlConnection.createStatement();
			statement.executeUpdate(query);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public void finalize(){
		try {
			mysqlConnection.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
