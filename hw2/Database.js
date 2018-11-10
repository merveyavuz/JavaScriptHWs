class Student {
    constructor (id, name, gpa, courses) {
        this.id = id || '';
        this.name = name || '';
        this.gpa = gpa || '';
        this.courses = courses || [];
    }
    toString () {
        return this.id+'';
	}
}

class Course {
    constructor (code, time, date, rooms) {
        this.code = code || '';
        this.time = time || '';
        this.date = date || '';
        this.rooms = rooms || [];
    }
    toString () {
        return this.code+'';
    }
}

class Database {
    constructor () {
        this.students = new Map();
        this.courses = new Map();
        this.ReadStudents();
        this.ReadCourses();
    }
	
	ReadCourses () {
		var url = "https://maeyler.github.io/JS/data/Courses.txt"
			fetch(url)
			.then(res => res.text()) 
			.then(res => [
				this.addCoursesToMap(res)
        ])
    }

	ReadStudents () {
		var url = "https://maeyler.github.io/JS/data/Students.txt";
    		fetch(url) 
			.then(res => res.text())
			.then(res => [
				this.addStudentsToMap(res)
		])
	}
		
	addCoursesToMap(file){
		let lines= file.split('\n');	
		var dersler=[];
		for (var line of lines){
		let words= line.split('\t');
			const c = new Course (words[0],words[1],words[2],words.slice(3));
			dersler.push(c);
		}
		for (var d in dersler){
			this.courses.set(dersler[d].code ,dersler[d]);			
		}
		
	}
	addStudentsToMap(file){
		let lines= file.split('\n');
		var ogrenciler=[]
		for (var line of lines){
		let words= line.split('\t');
			const s = new Student (words[0], words[1], words[2])
			for (var sc in words.slice(3)){
                             s.courses.push(this.courses.get(words.slice(3)[sc]))
                        }
			ogrenciler.push(s);
		}
		for (var o in ogrenciler){
			this.students.set(ogrenciler[o].id, ogrenciler[o]);
			
		}
		
	}
	
	getRandomStudent(){
            const keys = Array.from(this.students.keys())
            return this.students.get(keys[Math.trunc(keys.length * Math.random())])
		
	}
	
	getStudentsFromClass(c){
		const ogrenciler=[];
		this.students.forEach(student => {
			student.courses.forEach(course => {
				course.code === c.code ? ogrenciler.push(student) : null
			})
		})	
		return ogrenciler;
	}
	
	toString () {
            return 'Courses: ' + this.courses.size + ', Students: ' + this.students.size;
    }
	   
}